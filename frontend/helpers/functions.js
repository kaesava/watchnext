export const arrayRemoveAllWithKey = (array = [], keyValue = {}, key = "key") => {
    array.splice(array.findIndex(({key}) => key == keyValue), 1);
return array
}