import random
from statistics import mode

def get_degree(a_org):
    possible_degree = []
    length_a = len(a_org)
    for i in range(20):
        index = random.randint(0, length_a - 5)
        a = a_org[index:index + 2]
        vertices1 = a[0].bounding_poly.vertices
        bounding_box1 = [min(vertices1[0].x, vertices1[3].x), min(vertices1[0].y, vertices1[1].y),
                         max(vertices1[1].x, vertices1[2].x), max(vertices1[2].y, vertices1[3].y)]
        vertices2 = a[1].bounding_poly.vertices
        bounding_box2 = [min(vertices2[0].x, vertices2[3].x), min(vertices2[0].y, vertices2[1].y),
                         max(vertices2[1].x, vertices2[2].x), max(vertices2[2].y, vertices2[3].y)]

        if max(bounding_box1[0], bounding_box2[0]) < min(bounding_box1[2], bounding_box2[2]) or max(bounding_box1[2],
                                                                                                    bounding_box2[
                                                                                                        2]) < min(
                bounding_box1[0], bounding_box2[0]):  # right or left
            if bounding_box1[3] < bounding_box2[1]:
                possible_degree.append(90)
            else:
                possible_degree.append(270)
        else:  # upright or reverse
            if bounding_box1[2] < bounding_box2[0]:
                possible_degree.append(0)
            else:
                possible_degree.append(180)
    return mode(possible_degree)


def get_word(word):
    ans = ''
    for symbol in word.symbols:
        ans += symbol.text
    return ans


def get_title(paragraph):
    ans = ''
    for word in paragraph.words:
        ans = ans + get_word(word) + ' '
    return ans