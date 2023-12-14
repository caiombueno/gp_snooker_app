/**
 * A controller for managing the snooker balls position modes.
 */
class PositionModeController {
    #form;
    #startingPositionsRadio;
    #startingPositionsRadioKey;
    #randomRedsOnlyRadio;
    #randomRedsOnlyRadioKey;
    #randomRedsAndColouredRadio;
    #randomRedsAndColouredRadioKey;
    #onChangePositionMode;
    constructor({
        formId,
        startingPositionsRadioId,
        startingPositionsRadioKey,
        randomRedsOnlyRadioId,
        randomRedsOnlyRadioKey,
        randomRedsAndColouredRadioId,
        randomRedsAndColouredRadioKey,
        onChangePositionMode,
    }) {
        // initialize private fields with references to HTML elements and configuration values
        this.#form = document.getElementById(formId);
        this.#startingPositionsRadio = document.getElementById(startingPositionsRadioId);
        this.#startingPositionsRadioKey = startingPositionsRadioKey;
        this.#randomRedsOnlyRadio = document.getElementById(randomRedsOnlyRadioId);
        console.log(randomRedsOnlyRadioId);
        this.#randomRedsOnlyRadioKey = randomRedsOnlyRadioKey;
        this.#randomRedsAndColouredRadio = document.getElementById(randomRedsAndColouredRadioId);
        this.#randomRedsAndColouredRadioKey = randomRedsAndColouredRadioKey;
        this.#onChangePositionMode = onChangePositionMode;

        this.#setupEventListeners();
    }

    /**
     * Sets up event listeners for form changes.
     */
    #setupEventListeners() {
        this.#form.addEventListener('change', () => {
            // call the method to handle form changes
            this.#handleFormChange();
        });
    }

    /**
     * Handles form changes and calls the specified function based on the selected radio button.
     */
    #handleFormChange() {
        if (this.#startingPositionsRadio.checked) {
            this.#onChangePositionMode(this.#startingPositionsRadio.value);
        } else if (this.#randomRedsOnlyRadio.checked) {
            this.#onChangePositionMode(this.#randomRedsOnlyRadio.value);
        } else if (this.#randomRedsAndColouredRadio.checked) {
            this.#onChangePositionMode(this.#randomRedsAndColouredRadio.value);
        }
    }

    /**
     * To be called on P5.js keyPressed function.
     * Handles key presses and updates the selected radio button accordingly.
     */
    onKeyPressed(pressedKey) {
        pressedKey = pressedKey.toLowerCase();

        if (pressedKey === this.#startingPositionsRadioKey || pressedKey === this.#randomRedsOnlyRadioKey || pressedKey === this.#randomRedsAndColouredRadioKey) {
            // check which key was pressed and update the corresponding radio button
            if (pressedKey === this.#startingPositionsRadioKey) {
                this.#startingPositionsRadio.checked = true;
            } else if (pressedKey === this.#randomRedsOnlyRadioKey) {
                this.#randomRedsOnlyRadio.checked = true;
            } else if (pressedKey === this.#randomRedsAndColouredRadioKey) {
                this.#randomRedsAndColouredRadio.checked = true;
            }

            const event = new Event('change');
            this.#form.dispatchEvent(event);
        }

    }
}