This is a simple Jekyll starter for putting a website online quickly.

It fixes a problem with the default Jekyll generator (removes dates from URLs) and makes some other improvements.

## Installation

Be sure that Ruby 3 is installed. Use [`rb`](https://github.com/rbenv/rbenv) to install it if typing `ruby -v` in a terminal doesn't show a Ruby version.

If you don't have `yarn` installed, type `npm install -g yarn` to get it.

Then type these commands to install the dependencies:

```text
bundle install
yarn
```

## Configuration

Go into the `_config.yml` file and change the settings to match your site's name and social media usernames. You can also switch the theme by searching for Jekyll themes or tutorials on creating your own theme.

## Development Server

Type this command to start the development server:

```text
yarn start
```

## Deployment

It's configured to deploy on [Cloudflare Pages](https://pages.cloudflare.com/) (free), but that can easily be changed if you want.

Sign up for Cloudflare. Connect your domain. Then run this command:

```
yarn deploy
```

The initial tests might fail until a few hours after first connecting your domain. Go point your domain to the Cloudflare Pages project in the Cloudflare Pages dashboard and then redeploy (or run `yarn test:post_deploy`). The basic tests should then pass.
