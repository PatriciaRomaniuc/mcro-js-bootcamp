const getPuzzle = async (wordCount) =>  {
    const response = await fetch(`//puzzle.mead.io/puzzle?wordCount=${wordCount}`)
    if (response.status === 200) {
        const data = await response.json()
        return data.puzzle
    }
    else {
        throw new Error('Unable to fetch puzzle')
    }
}

const getPuzzleOld = (wordCount) =>  {
    return fetch(`//puzzle.mead.io/puzzle?wordCount=${wordCount}`).then((response) => {
        if (response.status === 200) {
            return response.json()
        } else {
            throw new Error('Unable to fetch puzzle')
        }
    }).then((data) => {
        return data.puzzle
    })
}

const getPuzzleSync = () => {
    const request = new XMLHttpRequest()
    request.open('GET', '//puzzle.mead.io/slow-puzzle?wordCount=3', false)
    request.send()
    if (request.readyState === 4 && request.status === 200) {
        const data = JSON.parse(request.responseText)
        return data.puzzle
    } else if (request.readyState === 4) {
        throw new Error('Things did not go well')
    }
}
   
const getCountry = async (countryCode) => {
    const response = await fetch(`//restcountries.eu/rest/v2/all`)
    if (response.status === 200) {
        const data = await response.json()
        return data.find((country) => country.alpha2Code === countryCode)
    }
    else {
        throw new Error('Unable to fetch country')
    }    
}

 
const getLocation = async () => {
    const response = await fetch('//ipinfo.io/json?token=2529470eed1c14')
    if (response.status === 200) {
        return response.json()
    }
    else {
        throw new Error('fetch location error')
    }
}

const getCurrentCountry = async () => {
    const myLocation = await getLocation()
    const country = await getCountry(myLocation.country) 
    return country
}

export { getPuzzle as default } 