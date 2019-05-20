import os
import sys

class Track:
    def __init__(self, mp3, name):
        self.mp3 = mp3
        self.name = name

def generate_script(tracks, path, lector_id):
    template = "REPLACE INTO Tracks(id, name, path, voice_over_id) VALUES "

    file = open("tracks.sql", 'w+')

    file.write("SET @tracks_path := '" + path + "';")
    file.write("\r\n")
    file.write("\r\n")

    for track in tracks:
        file.write(template + "(NULL, '" + track.name + "', concat(@tracks_path, '" + track.mp3 + "'), " + str(lector_id) + ");")
        file.write("\r\n")


if __name__ == "__main__":
    if(len(sys.argv) < 1):
        print("Usage: create_sql_for_audio <lector_name>")
        exit(1)

    lector_name = sys.argv[1]
    lector_id = 0
    if(lector_name == 'dorota'):
        lector_id = 1
    elif(lector_name == 'konrad'):
        lector_id = 2
    elif(lector_name == 'mateusz'):
        lector_id = 3

    if(lector_id == 0):
        exit(2)

    path = "/home/konrad/Documents/ac-project/wsi/fajstos/src/main/resources/tracks/" + lector_name + "/"

    mp3_list = os.listdir(path)
    tracks = []

    for name in mp3_list:
        tracks.append(Track(name, name.replace('.mp3', '')))

    generate_script(tracks, path, lector_id)