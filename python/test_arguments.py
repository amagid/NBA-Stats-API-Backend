def read_in():
    lines = sys.stdin.readlines()
    # Since our input would only be having one line, parse our JSON data from that

    return json.loads(lines[0])


def main():
    data = read_in()
    print data