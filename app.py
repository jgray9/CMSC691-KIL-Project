import sys, webview


if __name__ == '__main__':
    debug = len(sys.argv) > 1
    window = webview.create_window(
        'KIL Project',
        'http://localhost:5173/' if debug else 'frontend/dist/index.html'
    )
    webview.start(debug=debug)
