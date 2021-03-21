import {Selector, t} from 'testcafe';
import {Helper} from '../../helper';

/**
 * List of possible registration years on first registration filter dropdown list.
 */
export enum RegYears {
    Any = 'Beliebig',
    _2021 = '2021',
    _2020 = '2020',
    _2019 = '2019',
    _2018 = '2018',
    _2017 = '2017',
    _2016 = '2016',
    _2015 = '2015',
    _2014 = '2014',
    _2013 = '2013',
    _2012 = '2012',
    _2011 = '2011',
    _2010 = '2010',
    _2009 = '2009',
    _2008 = '2008',
    _2007 = '2007',
    _2006 = '2006',
    _2005 = '2005',
    _2004 = '2004',
    _2003 = '2003',
    _2002 = '2002',
    _2001 = '2001',
    _2000 = '2000',
    _1995 = '1995',
    _1990 = '1990',
    _1985 = '1985',
    _1980 = '1980'
}

/**
 * List of sort items.
 */
export enum SortList {
    LatestListingsFirst = 'Neueste Inserate zuerst',
    LowestPrice = 'Niedrigster Preis',
    HighestPrice = 'Höchster Preis',
    LowestMileage = 'Niedrigster Kilometerstand',
    HighestMileage = 'Höchster Kilometerstand',
    AToZ = 'Marke - A bis Z',
    ZToA = 'Marke - Z bis A'
}

/**
 * List of desire items from each card results.
 */
export interface IItemList {
    imgSrc:string;
    title:string;
    price:number,
    subtitle:string;
    monthlyFrom:number;
    regYear:number;
    fuel:string;
    km:number;
    transmission:string;
}

/**
 * List of desire items from all card results as an array list.
 */
export interface IAllItemList {
    imgSrc:string[],
    title:string[],
    price:number[],
    subtitle:string[],
    monthlyFrom:number[],
    regYear:number[],
    fuel:string[],
    km:number[],
    transmission:string[]
}

export class SearchPageObject {

    // General Selectors.
    cards = Selector('a.link___2Maxt');
    yearFilterBtn = Selector('#yearFilter');
    yearFilterArea = this.yearFilterBtn.sibling('div[aria-labelledby="yearFilter"]');
    closeImperfectionsBtn = Selector('button[data-qa-selector="close-imperfections-btn"]');
    rangeStartSelect = this.yearFilterArea.find('#rangeStart');
    rangeEndSelect = this.yearFilterArea.find('#rangeEnd');
    sortByList = Selector('#sortBy');
    advancedFilterBtn = Selector('#advancedFilter');
    moreFiltersBtn = Selector('#moreFilters');
    backIcon = Selector('svg.arrowIcon___1kvIT');
    applyFilterBtn = Selector('button[type="button"]').withExactText('Filter anwenden');

    // Selector for more button on medium screen width-size(767 < width-size < 1024).
    mediumSortByTitle = Selector('h3[class="inputTitle___1lFUX"]').withExactText('Sortieren nach');
    mediumInnerSortBySelect = this.mediumSortByTitle.sibling('.inputContent___1YSJ2').find('select');

    // Selector for more button on small screen width-size(width-size < 767).
    smallSortByLabel = Selector('div[class="itemLabel___3AtNl"]').withExactText('Sortieren nach');
    smallYearTypeLabel = Selector('div.label___1kOtd');
    smallFromBtn = this.smallYearTypeLabel.withExactText('Ab').sibling('button');
    smallToBtn = this.smallYearTypeLabel.withExactText('Bis').sibling('button');
    smallItemLabel = Selector('div.itemLabel___3AtNl');

    /**
     * This method is used to wait until the result cards being visible.
     * Maximum waiting time for the loading result is set to 3 sec.
     */
    async waitForLoadResultIfNeeded() {
        for (let i = 0; i < 30; i++) {
            if (await this.cards.visible) {
                break;
            }
            await t.wait(100);
        }
    }

    /**
     * Filter first registration date.
     * @param from - Selected year as a `FROM` for first registration filter.
     * @param to - Selected year as a `TO` for first registration filter (This is an optional parameter, default value is set to `Any`).
     */
    async filterRegYear(from:RegYears, to:RegYears = RegYears.Any) {
        const windowWidth = await Helper.getWindowInnerWidth();

        // Input validation.
        if (from !== RegYears.Any && to !== RegYears.Any) {
            if (from > to) {
                throw new Error('FROM date can not be greater than TO date!');
            }
        }

        await t.click(this.yearFilterBtn);

        if (windowWidth <= Helper.screenWidthSizeCategories.phoneMaxWidth) {

            // Actions for apply first registration filter on devices with the small width-size screen. (e.g mobile)
            await t
                .click(this.smallFromBtn)
                .click(this.smallItemLabel.withExactText(from))
                .click(this.smallToBtn)
                .click(this.smallItemLabel.withExactText(to))
                .click(this.backIcon)
                .click(this.applyFilterBtn);
        } else {

            // Actions for apply first registration filter on devices with the large width-size screen. (e.g tablet or desktop)
            await t
                .click(this.rangeStartSelect)
                .click(this.rangeStartSelect.find('option').withExactText(from))
                .click(this.rangeEndSelect)
                .click(this.rangeEndSelect.find('option').withExactText(to));
        }
    }

    /**
     * Sort result.
     * @param sortItem - Selected item to sort based on that.
     */
    async sortResult(sortItem:SortList) {
        const windowWidth = await Helper.getWindowInnerWidth();

        if (windowWidth >= Helper.screenWidthSizeCategories.desktopMinWidth) {

            // Actions for apply sort on devices with the small width-size screen. (e.g mobile)
            await t
                .click(this.sortByList)
                .click(this.sortByList.find('option').withExactText(sortItem));
        } else if (
            windowWidth < Helper.screenWidthSizeCategories.desktopMinWidth &&
            windowWidth > Helper.screenWidthSizeCategories.phoneMaxWidth
        ) {

            // Actions for apply sort on devices with the medium width-size screen. (e.g tablet)
            await t
                .click(this.advancedFilterBtn)
                .click(this.mediumInnerSortBySelect)
                .click(this.mediumInnerSortBySelect.find('option').withExactText(sortItem))
                .click(this.applyFilterBtn);
        } else {

            // Actions for apply sort on devices with the large width-size screen. (e.g desktop)
            await t
                .click(this.moreFiltersBtn)
                .click(this.smallSortByLabel)
                .click(this.smallItemLabel.withExactText(sortItem))
                .click(this.applyFilterBtn);
        }

    }

    /**
     * Gets the desire item from each card result.
     */
    async getResultList():Promise<IItemList[]> {
        let cardList = [];

        // Selectors.
        const imgEle = this.cards.find('img');
        const titleEle = this.cards.find('[data-qa-selector="title"]');
        const priceEle = this.cards.find('[data-qa-selector="price"]');
        const subtitleEle = this.cards.find('[data-qa-selector="subtitle"]');
        const monthlyPriceEle = this.cards.find('.monthlyPrice___2IYwf b');
        const specListEle = this.cards.find('[data-qa-selector="spec-list"]');
        const specEle = '[data-qa-selector="spec"]';
        const cartsNumber = await this.cards.count;

        for (let i = 0; i < cartsNumber; i++) {

            // Card values
            const imgSrcValue = await imgEle.nth(i).getAttribute('src');
            const titleValue = await titleEle.nth(i).textContent;
            const priceValue = Helper.filterNumber(await priceEle.nth(i).textContent);
            const subtitleValue = await subtitleEle.nth(i).textContent;
            const monthlyPriceValue = Helper.filterNumber(await monthlyPriceEle.nth(i).textContent);
            const regYearValue = Helper.filterNumber(await specListEle.nth(i).find(specEle).nth(0).textContent);
            const fuelValue = Helper.removeDot(await specListEle.nth(i).find(specEle).nth(1).textContent);
            const kmValue = Helper.filterNumber(await specListEle.nth(i).find(specEle).nth(2).textContent);
            const transmissionValue = Helper.removeDot(await specListEle.nth(i).find(specEle).nth(3).textContent);

            cardList.push({
                imgSrc: imgSrcValue,
                title: titleValue,
                price: priceValue,
                subtitle: subtitleValue,
                monthlyFrom: monthlyPriceValue,
                regYear: regYearValue,
                fuel: fuelValue,
                km: kmValue,
                transmission: transmissionValue
            });
        }
        return cardList;
    }

    /**
     * Gets the list of desire item from all card results.
     */
    async getItemList():Promise<IAllItemList> {
        const resultList = await this.getResultList();
        let items = {
            imgSrc: [],
            title: [],
            price: [],
            subtitle: [],
            monthlyFrom: [],
            regYear: [],
            fuel: [],
            km: [],
            transmission: []
        };
        for (let i = 0; i < resultList.length; i++) {
            items.imgSrc.push(resultList[i].imgSrc);
            items.title.push(resultList[i].title);
            items.price.push(resultList[i].price);
            items.subtitle.push(resultList[i].subtitle);
            items.monthlyFrom.push(resultList[i].monthlyFrom);
            items.regYear.push(resultList[i].regYear);
            items.fuel.push(resultList[i].fuel);
            items.km.push(resultList[i].km);
            items.transmission.push(resultList[i].transmission);
        }
        return items;
    }

    /**
     * Checks whether the results has been correctly filtered based on selected registration year or not.
     * @param from - Selected year as a `FROM` for first registration filter.
     * @param to - Selected year as a `TO` for first registration filter.
     * @param noResult - Set to True if the result expected to be empty (This is an optional parameter and set to false by default).
     */
    async hasCorrectRegYearFilter(from:RegYears, to:RegYears, noResult:boolean = false):Promise<boolean> {
        const {regYear} = await this.getItemList();
        let hasRightRegFilter:boolean;

        // Condition #1 - If the actual result is not empty but expected to be empty.
        if (noResult && regYear.length > 0) {
            hasRightRegFilter = false;
        }
        // Condition #2 - If the actual result is empty but expected to be not empty.
        else if (!noResult && regYear.length == 0) {
            hasRightRegFilter = false;
        }
        // Condition #3 - If the actual result is empty and also expected to be empty.
        else if (noResult && regYear.length == 0) {
            hasRightRegFilter = true;
        }
        // Condition #4 - If both (FROM/TO) values has been assigned.
        else if (from !== RegYears.Any && to !== RegYears.Any) {
            for (let i = 0; i < regYear.length; i++) {
                if (regYear[i] < Number(from) || regYear[i] > Number(to)) {
                    hasRightRegFilter = false;
                    break;
                } else {
                    hasRightRegFilter = true;
                }
            }
        }
        // Condition #5 - If both (FROM/TO) values has not been assigned.
        else if (from == RegYears.Any && to == RegYears.Any) {
            hasRightRegFilter = true;
        }
        // Condition #6 - If `FROM` value is assigned but `TO` value is not assigned.
        else if (from !== RegYears.Any && to == RegYears.Any) {
            for (let i = 0; i < regYear.length; i++) {
                if (regYear[i] < Number(from)) {
                    hasRightRegFilter = false;
                    break;
                } else {
                    hasRightRegFilter = true;
                }
            }
        }
        // Condition #7 - If `FROM` value is not assigned but `TO` value is assigned.
        else if (from == RegYears.Any && to !== RegYears.Any) {
            for (let i = 0; i < regYear.length; i++) {

                if (regYear[i] > Number(to)) {
                    hasRightRegFilter = false;
                    break;
                } else {
                    hasRightRegFilter = true;
                }
            }
        }
        return hasRightRegFilter;
    }

    /**
     * Checks whether the results has been correctly sort based on selected sort item or not.
     * This method does not cover sort item of `Neueste Inserate zuerst`/`Latest listings first` as checking this item needs connect to API.
     * @param sortItem - Selected item to sort based on that.
     */
    async hasCorrectSort(sortItem:SortList):Promise<boolean> {
        let hasCorrectSort:boolean;
        const itemList = await this.getItemList();

        switch (sortItem) {
            case SortList.LowestPrice:
                hasCorrectSort = Helper.isAscending(itemList.price);
                break;
            case SortList.HighestPrice:
                hasCorrectSort = Helper.isDescending(itemList.price);
                break;
            case SortList.LowestMileage:
                hasCorrectSort = Helper.isAscending(itemList.km);
                break;
            case SortList.HighestMileage:
                hasCorrectSort = Helper.isDescending(itemList.km);
                break;
            case SortList.AToZ:
                hasCorrectSort = Helper.isAscending(itemList.title);
                break;
            case SortList.ZToA:
                hasCorrectSort = Helper.isDescending(itemList.title);
                break;
            case SortList.LatestListingsFirst:
                throw new Error('The sort item of `Neueste Inserate zuerst` is not comparable without API testing!');
        }
        return hasCorrectSort;
    }

}
