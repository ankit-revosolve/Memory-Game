import RegularButton from '../RegularButton/RegularButton'

export default function Form({ handleSubmit }) {
    return (
        <form className="wrapper">
            <RegularButton handleClick={handleSubmit}>
                Start Game
            </RegularButton>
        </form>
    )
}