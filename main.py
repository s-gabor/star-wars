import swapi

luke = swapi.get_person(1)
print(luke.name, type(luke.name))
