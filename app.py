import os, sys, webview, re
from datasets import load_dataset, load_from_disk

def get_filenames(dir):
    try:
        return os.listdir(dir)
    except FileNotFoundError:
        os.mkdir(dir)
        return []

# takes a batch of rows and creates a new prompt column named 'text'
# prompt column is the two input sentences reformatted into an LLM prompt
def to_prompts(batch):
    prompts = []
    for sen1, sen2 in zip(batch['sentence1'], batch['sentence2']):
        prompts.append(f"Sentence1: {sen1}\nSentence2: {sen2}\nDo these sentences mean the same thing? Respond with 1 if they do, or 0 if they don't.")
    return {'text': prompts}

class Api:
    def create_dataset(name):
        if f'{name}.hf' in get_filenames('datasets'):
            return 'A dataset with this name already exists'
        if re.search(r'[^\w\d _-]', name) != None:
            return 'Dataset name cannot contain any special characters besides _ and -'
        if len(name) == 0:
            return 'Dataset name cannot be empty'
        
        dataset = load_dataset('nyu-mll/glue', 'mrpc')
        # add new prompt column and delete irrelevant columns
        # [idx, sentence1, sentence2, label] -> [text, label]
        dataset['train'].map(
            to_prompts,
            batched=True,
            batch_size=16,
            remove_columns=['sentence1','sentence2','idx']
        ).save_to_disk(f'datasets/{name}.hf')
        return 'success'
    
    def get_datasets():
        return get_filenames('datasets')

    def get_dataset(name):
        if f'{name}.hf' not in get_filenames('datasets'):
            return 'No dataset with this name exists'
        
        dataset = load_from_disk(f'datasets/{name}.hf')
        return {
            'name': name,
            'rows': len(dataset)
        }

    def delete_dataset(name):
        if f'{name}.hf' not in get_filenames('datasets'):
            return 'No dataset with this name exists'
        
        path = f'datasets/{name}.hf'
        for file in get_filenames(path):
            os.remove(f'{path}/{file}')
        os.rmdir(path)
        return 'success'

if __name__ == '__main__':
    debug = len(sys.argv) > 1
    window = webview.create_window(
        'KIL Project',
        'http://localhost:5173/' if debug else 'frontend/dist/index.html',
        js_api=Api
    )
    webview.start(debug=debug)