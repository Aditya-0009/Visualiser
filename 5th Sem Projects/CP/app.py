from flask import Flask, render_template, jsonify, request
from algorithms import bubble_sort, selection_sort, quick_sort

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/sort', methods=['POST'])
def sort():
    data = request.json
    array = data.get('array', [])
    algorithm = data.get('algorithm', '')

    if algorithm == 'bubbleSort':
        swaps = bubble_sort(array)
    elif algorithm == 'selectionSort':
        swaps = selection_sort(array)
    elif algorithm == 'quickSort':
        swaps = quick_sort(array, 0, len(array) - 1)
    else:   
        swaps = []

    return jsonify(swaps)

if __name__ == '__main__':
    app.run(debug=True)
