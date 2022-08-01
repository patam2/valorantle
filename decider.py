import json
import random
import time



def save_settings():
    with open('player_data.json', 'w') as outfile:
        json.dump(settings,outfile)

while True:
    global settings
    with open('player_data.json') as data:
        settings = json.load(data)
    settings['day'] += 1
    settings['answer'] = random.choice(list(settings['players'].keys()))
    save_settings()
    print('New day; settings!', )
    time.sleep(86400)