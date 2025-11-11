function EmojiButton({
    handleClick,
    emoji,
    selectedCardEntry, 
    matchedCardEntry
}) {

    const  cardContent = selectedCardEntry || matchedCardEntry ? emoji : "?"
    const cardStyle = selectedCardEntry ? "card-item--selected" : matchedCardEntry ? "card-item--matched" : "" 
    // const btnStyle = matchedCardEntry ? "btn--emoji__back--matched" : selectedCardEntry ? "btn--emoji__back--selected": "btn--emoji__front"
    return (
        <button
            className={`btn btn--emoji ${cardStyle}`}
            onClick={handleClick}
        >
            {cardContent}
        </button>
    )
}

export default EmojiButton