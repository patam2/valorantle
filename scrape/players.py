import requests
import lxml.html as html
import json


teams = [
    "https://www.vlr.gg/team/6675/the-guard"
]
data = {}


def get_page(url):
    return html.fromstring(requests.get(url).text)


def parse_player(obj, player_data):
    player_data['country'] = obj.xpath("//div[@class='player-header']/div/div[@class='ge-text-light']")[0] \
        .text_content() \
        .strip() \
        .title()
    agents = obj.xpath('//tbody/tr')
    player_data['agents'] = []
    for i in range(0, 3):
        try:
            player_data['agents'].append(
                agents[i].xpath('./td/img')[0] \
                    .attrib['alt'] \
                    .capitalize()
            )
        except:
           player_data['agents'].append('')
    return player_data

for team in teams:
    page = get_page(team)
    players = page.xpath("//div[@class='team-roster-item']")
    team_name = page.xpath('//title')[0] \
        .text_content() \
        .strip() \
        .split(':')[0]

    for player in players[:5]:
        player_data = {}
        if player_content := player.xpath("./a/div[@class='team-roster-item-name']/div")[0].text_content().strip():
            player_data['team'] = team_name
            player_data['name'] = player_content
            player_data['igl'] = b'Team Captain' in html.tostring(player)
            player_data = parse_player(
                get_page(
                    'https://vlr.gg' + [x for x in player.iterlinks()][0][2] + '?timespan=90d'
                ),
                player_data
             )
        data[player_data['name'].lower()] = [
            player_data['name'], player_data['country'], 'EDITTHIS', 
            player_data['team'], player_data['agents'], player_data['igl']
        ]


with open('player_data.json','w') as output:
    json.dump(data, output, indent=4)