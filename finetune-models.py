import os
from datasets import load_from_disk
from evaluate import eval_model
from transformers import AutoTokenizer, AutoModelForSequenceClassification, DataCollatorWithPadding, TrainingArguments, Trainer

# 
# CONSTANT VARIABLES
# 
DIRS = ["bert", "roberta", "gpt2", "bart"]
MODELNAMES = [
    "google-bert/bert-base-uncased",
    "FacebookAI/roberta-base",
    "openai-community/gpt2",
    "facebook/bart-large"
]
SPLITS = [
    "train-original",
    "train-augmented-wordnet",
    "train-augmented-lesk",
    "train-augmented-bert",
    "train-augmented-hybrid"
]

# 
# Create Model Files
# 
os.mkdir("models")
for dir, mname, split in zip(DIRS, MODELNAMES, SPLITS):
    # 
    # Load Objects
    # 
    model = AutoModelForSequenceClassification.from_pretrained(mname)
    tokenizer = AutoTokenizer.from_pretrained(mname)
    data_collator = DataCollatorWithPadding(tokenizer=tokenizer)

    if dir == 'gpt2':
        tokenizer.pad_token = tokenizer.eos_token
        model.config.pad_token_id = model.config.eos_token_id
    # 
    # Load & Prepare Data
    # 
    train_dataset = load_from_disk("dataset.hf")[split]
    eval_dataset = load_from_disk("dataset.hf")['validation']
    tokenized_train_dataset = train_dataset.map(lambda ds: tokenizer(ds['text']), batched=True, remove_columns=["text"])
    # 
    # Train
    # 
    training_arguments = TrainingArguments(
        output_dir=f"models/{dir}" + split[split.find('-'):],
        num_train_epochs=3,
        save_strategy="epoch"
    )
    trainer = Trainer(
        model=model,
        args=training_arguments,
        train_dataset=tokenized_train_dataset,
        data_collator=data_collator
    )
    trainer.train()