import sys, webview

class Api:
    def create_dataset(name):
        print(f'called create_dataset({name})')
    
    def get_datasets(name):
        print(f'called get_datasets({name})')

    def get_dataset(name):
        print(f'called get_dataset({name})')

    def delete_dataset(name):
        print(f'called delete_dataset({name})')

if __name__ == '__main__':
    debug = len(sys.argv) > 1
    window = webview.create_window(
        'KIL Project',
        'http://localhost:5173/' if debug else 'frontend/dist/index.html',
        js_api=Api
    )
    webview.start(debug=debug)