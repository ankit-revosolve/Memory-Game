import { useState, useEffect } from 'react'
import Form from "./components/Form/Form"
import MemoryCard from './components/MemoryCard/MemoryCard'

export default function App() {
    const [isGameOn, setIsGameOn] = useState(false)
    const [emojisData, setEmojisData] = useState([])
    const [selectedCards, setSelectedCards] = useState([])
    const [matchedCards, setMatchedCards] = useState([])

    useEffect(() => {
        if (selectedCards.length == 2 && selectedCards[0].name == selectedCards[1].name) {
            setMatchedCards(prev => [...prev, ...selectedCards])
        }
    }, [selectedCards])


    function shuffledData(data) {
        const pairedData = [...data, ...data];

        // Fishers Yates Algorithm to shuffle the array
        for (let i = pairedData.length; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            pairedData[i], pairedData[j] = pairedData[j], [pairedData[i]]
        }
        return pairedData
    }

    function getRandomData(instances, data) {
        let uniqueArr = []
        for (let i = 0; i < instances; i++) {
            let ran = Math.ceil(Math.random() * data.length)
            if (!uniqueArr.includes(ran)) {
                uniqueArr.push(data[ran])
            }
            else {
                i--
            }
        }
        return uniqueArr
    }


    async function startGame(e) {
        e.preventDefault()

        try {
            const response = await fetch("https://emojihub.yurace.pro/api/all/category/animals-and-nature")

            if (!response.ok) {
                throw new Error("Could not fetch data from API")
            }

            const data = await response.json()
            const dataSample = getRandomData(20, data)
            const properData = shuffledData(dataSample)
            setEmojisData(properData)
            setIsGameOn(true)
        } catch (err) {
            console.error(err)
        }
    }

    function turnCard(name, index) {
        const selectedCardEntry = selectedCards.find(card => card.index === index)

        if (!selectedCardEntry && selectedCards.length < 2) {
            setSelectedCards(prevCards => ([...prevCards, { name, index }]))
        }
        else if (!selectedCardEntry && selectedCards.length === 2) {
            setSelectedCards([{ name, index }])
        }
    }

    return (
        <main>
            <h1>Memory</h1>
            {!isGameOn && <Form handleSubmit={startGame} />}
            {isGameOn && <MemoryCard handleClick={turnCard} data={emojisData} />}
        </main>
    )
}