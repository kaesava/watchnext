export const arrayRemoveAllWithKey = (array = [], keyValue = {}, key = "key") => {
    array.splice(array.findIndex(({key}) => key == keyValue), 1);
return array
}

export const currencyFormat = (num) => {
    return '$' + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
 }