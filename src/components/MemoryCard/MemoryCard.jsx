import EmojiButton from "../EmojiButton/EmojiButton"
import { decodeEntity } from "html-entities"

export default function MemoryCard({ 
    handleClick, 
    data, 
    selectedCards, 
    matchedCards 
}) {

    const cardEl = data.map((emoji, index) => {
        const selectedCardEntry = selectedCards.find(card => card.index === index)
        const matchedCardEntry =  matchedCards.find(card => card.index === index)

        // console.log(matchedCardEntry)
        return (
        <li key={index} className="card-item">
            <EmojiButton
                handleClick={()=> handleClick(emoji.name,index)}
                selectedCardEntry={selectedCardEntry}
                matchedCardEntry={matchedCardEntry}
                emoji={decodeEntity(emoji.htmlCode[0])}
            />
        </li>
        )
    }
    )

    return <ul className="card-container">{cardEl}</ul>
}