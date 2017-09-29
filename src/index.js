import 'react-app-polyfill/ie9';
import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import 'typeface-roboto';
import QueryString from 'query-string';
import {Platform, Root} from '@yosmy/ui';
import History from 'history/createBrowserHistory';
import Raven from 'raven-js';
import * as serviceWorker from './serviceWorker';
import DrawerLayout from './DrawerLayout';
import BlankLayout from './BlankLayout';
import './index.css';
import {Front, ServerErrorMessage, ConnectionErrorMessage} from '@intermaple/mundorecarga-ui';
// import {Front, ServerErrorMessage, ConnectionErrorMessage} from './UI/index';
import icons from './Icons';

let base;

if (process.env.NODE_ENV !== 'production') {
    base = 'http://localhost:3000';
} else {
    base = 'https://api.mundorecarga.com';

    Raven
        .config(
            'https://ccd056b5f7a24db89fcff8f18384c3f9@sentry.io/279788',
            {
                whitelistUrls: [
                    'www.mundorecarga.com/static/js',
                ]
            }
        )
        .install();
}

class App extends React.Component {
    static propTypes = {
        history: PropTypes.object.isRequired,
    };

    state = {
        location: null,
        payload: {},
        error: false, // "server", "connection"
    };

    componentWillMount() {
        /* Navigation */

        const query = QueryString.parse(this.props.history.location.search);

        this.setState({
            location: this.props.history.location,
            payload: query
        });

        this.props.history.listen((location) => {
            const query = QueryString.parse(location.search);

            this.setState({
                location: location,
                payload: query
            });
        });
    }

    componentDidMount() {
        serviceWorker.register({
            onUpdate: (registration) => {
                if (registration.waiting) {
                    // When the user asks to refresh the UI, we'll need to reload the window
                    let preventDevToolsReloadLoop;
                    navigator.serviceWorker.addEventListener('controllerchange', (event) => {
                        // Ensure refresh is only called once.
                        // This works around a bug in "force update on reload".
                        if (preventDevToolsReloadLoop) {
                            return;
                        }

                        preventDevToolsReloadLoop = true;

                        window.location.reload();
                    });

                    // Send a message to the new serviceWorker to activate itself
                    registration.waiting.postMessage('skipWaiting');
                }
            }
        });
    }

    componentDidCatch(error, info) {
        if (error && error.code) {
            if (error.code === "server") {
                this.setState({
                    error: "server"
                });

                Raven.captureException(
                    error,
                    {
                        extra: info
                    }
                );
            } else if (error.code === "connection") {
                this.setState({
                    error: "connection"
                });
            }
        } else {
            this.setState({
                error: "other"
            });

            Raven.captureException(
                error,
                {
                    extra: info
                }
            );
        }
    }

    render() {
        if (
            this.state.error === "server"
            || this.state.error === "other"
        ) {
            return <ServerErrorMessage />
        }

        if (this.state.error === "connection") {
            return <ConnectionErrorMessage
                icons={icons}
                onRetry={() => {
                    this.setState({
                        error: false
                    });
                }}
            />
        }

        return <Front
            icons={icons}
            blankLayout={this._buildBlankLayout}
            frontendLayout={this._buildFrontendLayout}
            drawerLayout={this._buildDrawerLayout}
            api={{
                base: base
            }}
            navigation={{
                location: this.state.location.pathname,
                payload: this.state.payload,
                onNavigate: this._handleNavigate
            }}
            onError={this._handleError}
        />;
    }

    _handleNavigate = (url, payload = {}, callback = null) => {
        if (url === this.state.location.pathname) {
            return;
        }

        if (
            url.startsWith("http://")
            || url.startsWith("https://")
        ) {
            window.open(url, '_blank');

            return;
        }

        if (
            payload.target === 'blank'
        ) {
            const {target, ...query} = payload;

            window.open(
                url + '?' + QueryString.stringify(query),
                url + '?' + QueryString.stringify(query),
            );

            return;
        }

        this.props.history.push(url + '?' + QueryString.stringify(payload));

        if (callback) {
            callback();
        }
    };

    _buildBlankLayout = ({style, site, children, ...props}) => {
        return <BlankLayout
            icons={{
                close: icons.actions.close
            }}
            site={site
                ? "MundoRecarga - " + site
                : "MundoRecarga"
            }
            style={{
                margin: '0 auto',
                maxWidth: '1200px',
                ...style,
            }}
            {...props}
        >
            {children}
        </BlankLayout>;
    };

    _buildFrontendLayout = (({style, site, children, ...props}) => {
        return <BlankLayout
            site={site
                ? "MundoRecarga - " + site
                : "MundoRecarga"
            }
            icons={{
                menu: icons.objects.menu,
                close: icons.actions.close
            }}
            {...props}
        >
            {children}
        </BlankLayout>
    });

    _buildDrawerLayout = ({site, children, ...props}) => {
        return <DrawerLayout
            site={site
                ? "MundoRecarga - " + site
                : "MundoRecarga"
            }
            icons={{
                menu: icons.objects.menu,
                close: icons.actions.close
            }}
            {...props}
        >
            {children}
        </DrawerLayout>
    };

    _handleError = (response) => {
        const {code} = response;

        switch (code) {
            case "server":
                this.setState({
                    error: "server"
                });

                break;
            case "connection":
                this.setState({
                    error: "server"
                });

                break;
            default:
                throw response;
        }
    };
}

const InjectedApp = Platform.dimensions.withWidth()(App);

ReactDOM.render(
    <Root theme={{
        spacing: {
            unit: 1
        },
        palette: {
            // primary: ""
        }
    }}>
        <InjectedApp
            history={new History()}
        />
    </Root>,
    document.getElementById('root')
);
