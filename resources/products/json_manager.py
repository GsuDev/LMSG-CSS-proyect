import json
import os

def load_json(file_path):
    """Load JSON data from a file."""
    if not os.path.exists(file_path):
        print(f"File '{file_path}' not found. Creating an empty JSON.")
        return []
    with open(file_path, 'r', encoding='utf-8') as file:
        try:
            return json.load(file)
        except json.JSONDecodeError:
            print(f"Error reading JSON from '{file_path}'. Starting with empty data.")
            return []

def save_json(data, file_path):
    """Save JSON data to a file."""
    with open(file_path, 'w', encoding='utf-8') as file:
        json.dump(data, file, indent=4, ensure_ascii=False)
        print(f"Data saved to '{file_path}'.")

def add_attribute(json_data, attribute, value):
    """Add an attribute with a default value to all objects in the JSON."""
    for obj in json_data:
        if attribute not in obj:
            obj[attribute] = value
    return json_data

def remove_attribute(json_data, attribute):
    """Remove an attribute from all objects in the JSON."""
    for obj in json_data:
        if attribute in obj:
            del obj[attribute]
    return json_data

def modify_attributes(json_data):
    """Modify attributes of objects in the JSON."""
    attribute = input("Enter the attribute name to modify: ").strip()
    modify_all = input("Do you want to modify all at once? (yes/no): ").strip().lower() == 'yes'

    if modify_all:
        value = input(f"Enter the new value for all '{attribute}': ").strip()
        for obj in json_data:
            obj[attribute] = value  # Modify regardless of the current value
    else:
        for obj in json_data:
            print(f"Object ID {obj.get('id', '[No ID]')}, Name: {obj.get('nombre', '[No Name]')}")
            current_value = obj.get(attribute, "[Not Set]")
            print(f"Current value of '{attribute}': {current_value}")
            value = input(f"Enter the new value for this object (leave empty to skip): ").strip()
            if value:
                obj[attribute] = value
    return json_data

def create_object(json_data):
    """Create a new object and add it to the JSON."""
    new_object = {}
    while True:
        key = input("Enter the attribute name for the new object (leave empty to finish): ").strip()
        if not key:
            break
        value = input(f"Enter the value for '{key}': ").strip()
        new_object[key] = value
    json_data.append(new_object)
    print("New object added.")
    return json_data

def delete_object(json_data):
    """Delete an object by its ID."""
    try:
        obj_id = int(input("Enter the ID of the object to delete: ").strip())
        for obj in json_data:
            if obj.get("id") == obj_id:
                json_data.remove(obj)
                print(f"Object with ID {obj_id} deleted.")
                return json_data
        print(f"No object found with ID {obj_id}.")
    except ValueError:
        print("Invalid ID. Please enter a numeric value.")
    return json_data

def display_json(json_data):
    """Print JSON data in a readable format."""
    print(json.dumps(json_data, indent=4, ensure_ascii=False))

def main():
    file_path = "products.json"

    # Load JSON data from file
    json_data = load_json(file_path)

    if not isinstance(json_data, list):
        print("The JSON file must contain a list of objects.")
        return

    while True:
        print("\nJSON Utility Menu:")
        print("1. Add an attribute")
        print("2. Remove an attribute")
        print("3. Modify attributes")
        print("4. Create an object")
        print("5. Delete an object")
        print("6. Display JSON data")
        print("7. Save and Exit")

        choice = input("Enter your choice: ").strip()

        if choice == "1":
            attribute = input("Enter the attribute name to add: ").strip()
            value = input(f"Enter the default value for '{attribute}': ").strip()
            json_data = add_attribute(json_data, attribute, value)

        elif choice == "2":
            attribute = input("Enter the attribute name to remove: ").strip()
            json_data = remove_attribute(json_data, attribute)

        elif choice == "3":
            json_data = modify_attributes(json_data)

        elif choice == "4":
            json_data = create_object(json_data)

        elif choice == "5":
            json_data = delete_object(json_data)

        elif choice == "6":
            display_json(json_data)

        elif choice == "7":
            save_json(json_data, file_path)
            break

        else:
            print("Invalid choice. Please try again.")

if __name__ == "__main__":
    main()
