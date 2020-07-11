import os
from google.cloud import vision
import cv2
import numpy as np
from OCR.word_extract import get_degree, get_word, get_title
from OCR.organize import get_overlap

os.environ['GOOGLE_APPLICATION_CREDENTIALS'] = 'google_credentials.json'


def detect_text(img):
    client = vision.ImageAnnotatorClient()

    content = img.read()
    # set image
    image = vision.types.Image(content=content)

    # get response from gcloud client
    response = client.text_detection(image=image)

    # get spinning degree aw yeah
    a_org = response.text_annotations
    degree = get_degree(a_org)
    if degree == 180:
        nparr = np.fromstring(content, np.uint8)
        img_np = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
        img = cv2.rotate(img_np, cv2.ROTATE_180)
        image = vision.types.Image(
            content=cv2.imencode('.jpg', img)[1].tostring())
        response = client.text_detection(image=image)
    a_org = response.text_annotations
    degree = get_degree(a_org)

    if response.error.message:
        raise Exception(
            '{}\nFor more info on error messages, check: '
            'https://cloud.google.com/apis/design/errors'.format(
                response.error.message))

    # list of paragraphs that is possibly a title
    possible_title_paragraphs = []
    content_texts = []
    content_bounding_boxes = []

    # get page response
    # usually there is only 1 page
    page = response.full_text_annotation.pages[0]

    # get all the blocks
    blocks = page.blocks

    # Get average text density
    avg_density = len(
        response.text_annotations[0].description) / (page.width * page.height)

    # parse data to identify the title
    for i in range(len(blocks)):
        for paragraph in blocks[i].paragraphs:
            bounding_temp = paragraph.bounding_box
            vertices = bounding_temp.vertices
            bounding_box = [min(vertices[0].x, vertices[3].x), min(vertices[0].y, vertices[1].y),
                            max(vertices[1].x, vertices[2].x), max(vertices[2].y, vertices[3].y)]
            bounding_box_area = (
                bounding_box[2] - bounding_box[0]) * (bounding_box[3] - bounding_box[1])
            title = get_title(paragraph)
            density = len(title) / bounding_box_area
            if density < avg_density:
                density_prob = 0.2 + (1 - density / avg_density)
            else:
                density_prob = 0.1
            position_prob = (0.9) ** i
            if degree == 0:
                bounding_box_prob = (
                    bounding_box[2] - bounding_box[0]) / page.width
                final_prob = 0.6 * density_prob + 0.5 * position_prob + 0.2 * bounding_box_prob
                if final_prob > 0.85:
                    possible_title_paragraphs.append(title)
                else:
                    content_texts.append(title)
                    content_bounding_boxes.append(bounding_box)

            elif degree == 90:
                bounding_box_prob = (
                    bounding_box[3] - bounding_box[1]) / page.height
                final_prob = 0.6 * density_prob + 0.5 * position_prob + 0.2 * bounding_box_prob
                if final_prob > 0.85:
                    possible_title_paragraphs.append(title)
                else:
                    content_texts.append(title)
                    content_bounding_boxes.append(bounding_box)

            elif degree == 270:
                bounding_box_prob = (
                    bounding_box[3] - bounding_box[1]) / page.height
                final_prob = 0.6 * density_prob + 0.5 * position_prob + 0.2 * bounding_box_prob
                if final_prob > 0.85:
                    possible_title_paragraphs.append(title)
                else:
                    content_texts.append(title)
                    content_bounding_boxes.append(bounding_box)

    final_content = get_overlap(
        content_bounding_boxes, page.width, page.height, degree)
    for column in range(len(final_content)):
        for para in range(len(final_content[column])):
            final_content[column][para] = content_texts[content_bounding_boxes.index(
                final_content[column][para])]
    final_content = [item for sublist in final_content for item in sublist]

    ans = {}
    title = bytes(' '.join(possible_title_paragraphs).replace(
        '\n', ' '), encoding='utf-8')
    text = bytes(' '.join(final_content).replace("\n", ' '), encoding='utf-8')
    ans['article_title'] = title.decode('utf-8')
    ans['article_content'] = text.decode('utf-8')
    return ans
