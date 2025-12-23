import math, torch

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
        # accuracy
        'accuracy': (tp+tn)/len(ds),
        # precision
        'precision': tp/(tp+fp) if (tp+fp) > 0 else 0.0,
        # recall
        'recall': tp/(tp+fn) if (tp+fn) > 0 else 0.0,
        # f1 score
        'f1': (2*tp)/(2*tp+fp+fn) if (2*tp+fp+fn) != 0 else 0.0,
        # matthew correlation coefficent
        'mcc': (tp*tn-fp*fn) / math.sqrt((tp+fn)*(tp+fp)*(tn+fp)*(tn+fn)) if ((tp+fn)*(tp+fp)*(tn+fp)*(tn+fn)) != 0 else 0.0,
        # label counts 
        'correct': correct,
        'guesses': guesses
    }