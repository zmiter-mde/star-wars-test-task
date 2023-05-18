## Existing Swat Wars Heroes App
- Maing page with unordered heroes list
- List supports pagination and search by hero name (default API behavior). On refresh pagination and search are lost
- By clicking a hero card, navigated to the second "Hero Details" page
- All the hero fields are mandatory, sometimes NaN comes from BE (as "unknown")
- Possibility to update hero details to redux and go back to main page
- On pagination change updated hero details are lost (may be fixed with redux store restructuring or BE simulation)

## Next steps

1. Cover pages and components with tests
2. Move url paths to config
3. Move colours (and other values) to theme config
4. Move texts to i18n files
5. Switch to RTKQuery
6. Add possibility to save page&search to URL

## Scripts

- `dev`/`start` - start dev server and open browser
- `build` - build for production
- `preview` - locally preview production build
- `test` - launch test runner

## Production :)

- [Deployed to Netlify](https://main--roaring-moxie-3ffbe2.netlify.app/)