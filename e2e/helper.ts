import {ClientFunction} from 'testcafe';

export class Helper {

    /**
     * Gets window inner width-size.
     */
    static getWindowInnerWidth = ClientFunction(() => window.innerWidth);

    /**
     * List of screen size categories.
     */
    static screenWidthSizeCategories = {
        phoneMaxWidth: 767,
        desktopMinWidth: 1024
    };

    /**
     * Filter number from text.
     * @param text - Text to be filtered.
     */
    static filterNumber(text:string):number {
        return parseFloat(text.replace(/[^0-9]/g, '').trim());
    }

    /**
     * Remove dot mark (•) from text.
     * @param text - Text to be filtered.
     */
    static removeDot(text:string):string {
        return text.replace('•', '').trim();
    }

    /**
     * Checks whether the array variables has Ascending order or not.
     * The method can be applied for both numeric and alphanumeric variables inside array.
     * @param array - Selected array to be checked.
     */
    static isAscending(array:any[]):boolean {
        for (let i = 1; i < array.length; i++) {
            if (array[i - 1] > array[i]) {
                return false;
            }
        }
        return true;
    }

    /**
     * Checks whether the array variables has Descending order or not.
     * The method can be applied for both numeric and alphanumeric variables inside array.
     * @param array - Selected array to be checked.
     */
    static isDescending(array:any[]):boolean {
        for (let i = 1; i < array.length; i++) {
            if (array[i - 1] < array[i]) {
                return false;
            }
        }
        return true;
    }

}
