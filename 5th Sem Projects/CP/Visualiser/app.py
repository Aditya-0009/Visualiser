from flask import Flask, render_template, jsonify, request , redirect , url_for
from algorithms import bubble_sort, selection_sort, quick_sort

app = Flask(__name__)


@app.route('/', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        return redirect(url_for('index'))
    else:
        return render_template('login.html')

@app.route('/signup')
def signup():
    return render_template('signup.html')

from flask import session  # Import session

@app.route('/home', methods=['GET', 'POST'])
def index():
    # Retrieve username from session
    username = session.get('username')
    return render_template('index.html', username=username)  # Pass username to the template

@app.route('/contact')
def contact():
    return render_template('contact.html')

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
