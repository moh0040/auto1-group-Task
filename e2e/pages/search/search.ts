import {Pages} from '../../pages';
import {RegYears, SearchPageObject, SortList} from './search.po';
import {t} from 'testcafe';

const search = new SearchPageObject();

fixture`Filter and sort functionality`
    .page(Pages.searchPage)
    .beforeEach(async () => {

        // Accept cookies.
        await t.click(search.closeImperfectionsBtn);
    });
test('Should display correct result after applying registration filter of `FROM 2015` and sort result by `Highest Price`.', async () => {
    // Given the user is on search page.

    // When filter cars by first registration of `FROM 2015`.
    await search.filterRegYear(RegYears._2015);

    // And sort cars by price descending.
    await search.sortResult(SortList.HighestPrice);

    // And wait for load the result if needed.
    await search.waitForLoadResultIfNeeded();

    // Then verify that all cars are filtered by first registration (2015+).
    const hasCorrectRegYearFilterFrom2015 = await search.hasCorrectRegYearFilter(RegYears._2015, RegYears.Any);
    await t.expect(hasCorrectRegYearFilterFrom2015).ok();

    // And verify that all cars are sorted by price descending.
    const hasCorrectSortByHighestPrice = await search.hasCorrectSort(SortList.HighestPrice);
    await t.expect(hasCorrectSortByHighestPrice).ok();
});
