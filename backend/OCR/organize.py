import random

def overlap(bounding_box1, bounding_box2, degree=0):
    if degree == 0:
        range1 = min(bounding_box1[2], bounding_box2[2])
        range2 = max(bounding_box1[0], bounding_box2[0])
        overlap_range = range1 - range2
        if bounding_box1[2] == range1 and bounding_box1[0] == range2 or bounding_box2[2] == range1 and bounding_box2[
            0] == range2:
            return True
        else:
            if overlap_range > 0 and overlap_range > 0.6 * (
                    bounding_box1[2] - bounding_box1[0]) and overlap_range > 0.6 * (
                    bounding_box2[2] - bounding_box2[0]):  # overlapping
                return True
            else:
                return False
    elif degree == 90:
        range1 = min(bounding_box1[3], bounding_box2[3])
        range2 = max(bounding_box1[1], bounding_box2[1])
        overlap_range = range1 - range2
        if bounding_box1[3] == range1 and bounding_box1[1] == range2 or bounding_box2[3] == range1 and bounding_box2[
            1] == range2:
            return True
        else:
            if overlap_range > 0 and overlap_range > 0.6 * (
                    bounding_box1[3] - bounding_box1[1]) and overlap_range > 0.6 * (
                    bounding_box2[3] - bounding_box2[1]):  # overlapping
                return True
            else:
                return False

    elif degree == 270:
        range1 = min(bounding_box1[3], bounding_box2[3])
        range2 = max(bounding_box1[1], bounding_box2[1])
        overlap_range = range1 - range2
        if bounding_box1[3] == range1 and bounding_box1[1] == range2 or bounding_box2[3] == range1 and bounding_box2[
            1] == range2:
            return True
        else:
            if overlap_range > 0 and overlap_range > 0.6 * (
                    bounding_box1[3] - bounding_box1[1]) and overlap_range > 0.6 * (
                    bounding_box2[3] - bounding_box2[1]):  # overlapping
                return True
            else:
                return False


def get_overlap_helper(bounding_boxes, page_width, page_height, degree=0):
    if degree == 0:
        overlapping = []
        bounding_boxes_copy = bounding_boxes.copy()
        a = len(bounding_boxes)

        for i in range(a):
            if overlapping == []:
                if bounding_boxes[i][2] - bounding_boxes[i][0] > page_width / 8:
                    overlapping.append([bounding_boxes[i]])
                    bounding_boxes_copy.remove(bounding_boxes[i])
            else:
                use = False
                for overlap_item in overlapping:
                    if overlap(bounding_boxes[i], overlap_item[0]):
                        use = True
                        overlap_item.append(bounding_boxes[i])
                        bounding_boxes_copy.remove(bounding_boxes[i])
                        break
                if use == False:
                    if bounding_boxes[i][2] - bounding_boxes[i][0] > page_width / 8:
                        overlapping.append([bounding_boxes[i]])
                        bounding_boxes_copy.remove(bounding_boxes[i])

        bounding_boxes = bounding_boxes_copy
        a = len(bounding_boxes)
        for i in range(a):
            if overlapping == []:
                overlapping.append([bounding_boxes[i]])
            else:
                use = False
                for overlap_item in overlapping:
                    if overlap(bounding_boxes[i], overlap_item[0]):
                        use = True
                        overlap_item.append(bounding_boxes[i])
                        break
                if use == False:
                    overlapping.append([bounding_boxes[i]])

        return overlapping

    elif degree == 90:
        overlapping = []
        bounding_boxes_copy = bounding_boxes.copy()
        a = len(bounding_boxes)

        for i in range(a):
            if overlapping == []:
                if bounding_boxes[i][3] - bounding_boxes[i][1] > page_height / 8:
                    overlapping.append([bounding_boxes[i]])
                    bounding_boxes_copy.remove(bounding_boxes[i])
            else:
                use = False
                for overlap_item in overlapping:
                    if overlap(bounding_boxes[i], overlap_item[0], degree=degree):
                        use = True
                        overlap_item.append(bounding_boxes[i])
                        bounding_boxes_copy.remove(bounding_boxes[i])
                        break
                if use == False:
                    if bounding_boxes[i][3] - bounding_boxes[i][1] > page_width / 8:
                        overlapping.append([bounding_boxes[i]])
                        bounding_boxes_copy.remove(bounding_boxes[i])

        bounding_boxes = bounding_boxes_copy
        a = len(bounding_boxes)
        for i in range(a):
            if overlapping == []:
                overlapping.append([bounding_boxes[i]])
            else:
                use = False
                for overlap_item in overlapping:
                    if overlap(bounding_boxes[i], overlap_item[0], degree=degree):
                        use = True
                        overlap_item.append(bounding_boxes[i])
                        break
                if use == False:
                    overlapping.append([bounding_boxes[i]])

        return overlapping

    elif degree == 270:
        overlapping = []
        bounding_boxes_copy = bounding_boxes.copy()
        a = len(bounding_boxes)

        for i in range(a):
            if overlapping == []:
                if bounding_boxes[i][3] - bounding_boxes[i][1] > page_height / 8:
                    overlapping.append([bounding_boxes[i]])
                    bounding_boxes_copy.remove(bounding_boxes[i])
            else:
                use = False
                for overlap_item in overlapping:
                    if overlap(bounding_boxes[i], overlap_item[0], degree=degree):
                        use = True
                        overlap_item.append(bounding_boxes[i])
                        bounding_boxes_copy.remove(bounding_boxes[i])
                        break
                if use == False:
                    if bounding_boxes[i][3] - bounding_boxes[i][1] > page_width / 8:
                        overlapping.append([bounding_boxes[i]])
                        bounding_boxes_copy.remove(bounding_boxes[i])

        bounding_boxes = bounding_boxes_copy
        a = len(bounding_boxes)
        for i in range(a):
            if overlapping == []:
                overlapping.append([bounding_boxes[i]])
            else:
                use = False
                for overlap_item in overlapping:
                    if overlap(bounding_boxes[i], overlap_item[0], degree=degree):
                        use = True
                        overlap_item.append(bounding_boxes[i])
                        break
                if use == False:
                    overlapping.append([bounding_boxes[i]])

        return overlapping


def get_overlap(bounding_boxes, page_width, page_height, degree=0):
    if degree == 0:
        bounding_boxes_copy = bounding_boxes.copy()
        all_ans = []
        for i in range(20):
            random.shuffle(bounding_boxes_copy)
            ans = get_overlap_helper(bounding_boxes_copy, page_width, page_height, degree=degree)
            all_ans.append(ans)

        temp_final_ans = []
        min_length = 1000
        for ans in all_ans:
            if len(ans) < min_length:
                temp_final_ans = ans
                min_length = len(ans)

        final_ans = []
        for column in temp_final_ans:
            sort_for_column = [i[1] for i in column]
            column_index = sorted(range(len(sort_for_column)), key=sort_for_column.__getitem__)
            column = [column[i] for i in column_index]
            final_ans.append(column)

        sort_for_ans = [i[0][0] for i in final_ans]
        ans_index = sorted(range(len(sort_for_ans)), key=sort_for_ans.__getitem__)
        final_ans = [final_ans[i] for i in ans_index]

    elif degree == 90:
        bounding_boxes_copy = bounding_boxes.copy()
        all_ans = []
        for i in range(20):
            random.shuffle(bounding_boxes_copy)
            ans = get_overlap_helper(bounding_boxes_copy, page_width, page_height, degree=degree)
            all_ans.append(ans)

        temp_final_ans = []
        min_length = 1000
        for ans in all_ans:
            if len(ans) < min_length:
                temp_final_ans = ans
                min_length = len(ans)

        final_ans = []
        for column in temp_final_ans:
            sort_for_column = [i[3] for i in column][::-1]
            column_index = sorted(range(len(sort_for_column)), key=sort_for_column.__getitem__)
            column = [column[i] for i in column_index]
            final_ans.append(column)

        sort_for_ans = [i[0][1] for i in final_ans]
        ans_index = sorted(range(len(sort_for_ans)), key=sort_for_ans.__getitem__)
        final_ans = [final_ans[i] for i in ans_index]

    elif degree == 270:
        bounding_boxes_copy = bounding_boxes.copy()
        all_ans = []
        for i in range(20):
            random.shuffle(bounding_boxes_copy)
            ans = get_overlap_helper(bounding_boxes_copy, page_width, page_height, degree=degree)
            all_ans.append(ans)

        temp_final_ans = []
        min_length = 1000
        for ans in all_ans:
            if len(ans) < min_length:
                temp_final_ans = ans
                min_length = len(ans)

        final_ans = []
        for column in temp_final_ans:
            sort_for_column = [i[2] for i in column]
            column_index = sorted(range(len(sort_for_column)), key=sort_for_column.__getitem__)
            column = [column[i] for i in column_index]
            final_ans.append(column)

        sort_for_ans = [i[0][1] for i in final_ans]
        ans_index = sorted(range(len(sort_for_ans)), key=sort_for_ans.__getitem__)[::-1]
        final_ans = [final_ans[i] for i in ans_index]
    return final_ans