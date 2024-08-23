def bubble_sort(arr):
    swaps = []
    n = len(arr)
    for i in range(n):
        for j in range(0, n-i-1):
            if arr[j] > arr[j+1]:
                arr[j], arr[j+1] = arr[j+1], arr[j]
                swaps.append({"firstPosition": j, "lastPosition": j+1})
    return swaps

def selection_sort(arr):
    swaps = []
    for i in range(len(arr)):
        min_idx = i
        for j in range(i+1, len(arr)):
            if arr[j] < arr[min_idx]:
                min_idx = j
        arr[i], arr[min_idx] = arr[min_idx], arr[i]
        swaps.append({"firstPosition": min_idx, "lastPosition": i})
    return swaps

def partition(arr, low, high):
    swaps = []
    pivot = arr[high]
    i = low - 1
    for j in range(low, high):
        if arr[j] <= pivot:
            i += 1
            arr[i], arr[j] = arr[j], arr[i]
            swaps.append({"firstPosition": i, "lastPosition": j})
    arr[i + 1], arr[high] = arr[high], arr[i + 1]
    swaps.append({"firstPosition": i + 1, "lastPosition": high})
    return i + 1, swaps

def quick_sort(arr, low, high):
    swaps = []
    if low < high:
        pi, new_swaps = partition(arr, low, high)
        swaps.extend(new_swaps)
        swaps.extend(quick_sort(arr, low, pi - 1))
        swaps.extend(quick_sort(arr, pi + 1, high))
    return swaps
