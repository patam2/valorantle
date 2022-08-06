import json
import random
import time


past_answers = open('pastanswers.txt', 'r').read().splitlines()

def save_settings():
    with open('player_data.json', 'w') as outfile:
        json.dump(settings,outfile)

time.sleep(int(input()))

while True:
    global settings
    with open('player_data.json') as data:
        settings = json.load(data)
    settings['day'] += 1
    answer = random.choice(list(settings['players'].keys()))
    if answer in past_answers:
        continue
    settings['answer'] = answer
    past_answers.append(answer)
    open('pastanswers.txt', 'a').write('\n'.join(past_answers))
    save_settings()
    print('New day; settings!', )
    time.sleep(86400)