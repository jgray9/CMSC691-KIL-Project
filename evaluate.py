import torch

def eval_model(model, tokenizer, ds):
    tp = 0
    tn = 0
    fp = 0
    fn = 0

    correct = [0,0]
    guesses = [0,0]

    for row in ds:
        prompt = row['text']
        label = row['label']

        with torch.no_grad():
            tokens = tokenizer(prompt, return_tensors='pt').to('cuda')
            tokenized_output = model(**tokens)
        
        guess = tokenized_output['logits'].argmax()
        correct[label] += 1
        guesses[guess] += 1
        if guess:
            if label:
                tp += 1
            else:
                fp += 1
        else:
            if label:
                fn += 1
            else:
                tn += 1
    
    return {
        'accuracy': (tp+tn)/len(ds),# accuracy
        'precision': tp/(tp+fp),    # precision
        'recall': tp/(tp+fn),       # recall
        'f1': (2*tp)/(2*tp+fp+fn),  # f1 score
        'correct': correct,
        'guesses': guesses
    }