import os

class Track:
    def __init__(self, mp3, name):
        self.mp3 = mp3
        self.name = name

def generate_script(tracks, path):
    template = "REPLACE INTO Tracks(id, name, path) VALUES "

    file = open("tracks.sql", 'w+')

    file.write("SET @tracks_path := '" + path + "';")
    file.write("\r\n")
    file.write("\r\n")

    for track in tracks:
        file.write(template + "(NULL, '" + track.name + "', concat(@tracks_path, '" + track.mp3 + "'));")
        file.write("\r\n")


if __name__ == "__main__":
    path = "/home/konrad/Documents/ac-project/wsi/fajstos/src/main/resources/tracks/"
    mp3_list = os.listdir(path)
    tracks = []

    for name in mp3_list:
        tracks.append(Track(name, name.replace('.mp3', '')))

    generate_script(tracks, path)
