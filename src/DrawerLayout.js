import React, {Component} from 'react';
import {Helmet} from "react-helmet";
import AppBar from '@material-ui/core/AppBar';
import CircularProgress from '@material-ui/core/CircularProgress';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListSubheader from '@material-ui/core/ListSubheader';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Snackbar from '@material-ui/core/Snackbar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import {withTheme, withStyles} from '@material-ui/core/styles';
import {Button, Image} from '@yosmy/ui';
import {DrawerLayoutProps, prepareFlexParentStyle, prepareMarginStyle, preparePaddingStyle} from '@yosmy/ui-spec'

class DrawerLayout extends Component {
    static propTypes = DrawerLayoutProps;

    state = {
        drawer: false
    };

    render() {
        let {theme, icons, flow, align, margin, padding, site, title, left, right, menu, progress, notification, children} = this.props;

        /* We need to include this style, otherwise the menu will spread to the bottom */
        const StyledList = withStyles({
            root: {
                flex: '0 1 auto'
            }
        })(({classes, children, ...props}) => {
            return <List
                classes={classes}
                {...props}
            >
                {children}
            </List>
        });

        const StyledDrawer = withStyles({
            paper: {
                padding: '16px',
                backgroundImage: menu && menu.background && `url(${menu.background})`,
                backgroundPosition: menu && menu.background && 'center',
                backgroundSize: menu && menu.background && 'cover',
            }
        })(({classes, children, ...props}) => {
            return <Drawer
                classes={classes}
                open={this.state.drawer}
                onClose={(open) => this.setState({drawer: false})}
                {...props}
            >
                {children}
            </Drawer>
        });

        const metas = <Helmet>
            <title>{site + (title ? ' - ' + title : '')}</title>
            {this.props.meta && this.props.meta.title && <meta name="title" content={this.props.meta.title} />}
            {/*{this.props.meta && this.props.meta.description && <meta name="description" content={this.props.meta.description} />}*/}
            {/*{this.props.meta && this.props.meta.keywords && <meta name="keywords" content={this.props.meta.keywords} />}*/}
        </Helmet>;

        return <React.Fragment>
            {metas}
            <AppBar position="static">
                <Toolbar>
                    <div
                        style={{
                            flex: 1,
                            justifyContent: 'flex-start'
                        }}
                    >
                        <Button
                            tooltip={left ? left.tooltip : "Menu"}
                            onClick={left ? left.onClick : () => {
                                this.setState({
                                    drawer: true
                                });
                            }}
                        >
                            {left ? left.icon : <icons.menu />}
                        </Button>
                    </div>
                    {title && <Typography
                        variant="h6"
                        color="inherit"
                        style={{
                            flex: 2,
                            textAlign: 'center'
                        }}
                    >
                        {title}
                    </Typography>}
                    <div
                        style={{
                            flex: 1,
                            alignItems: 'center',
                            // justifyContent: 'flex-end',
                            textAlign: 'right'
                        }}
                    >
                        {progress === true
                            ? <CircularProgress
                                size={25}
                                style={{
                                    color: '#fff',
                                    marginTop: '8px'
                                }}
                            />
                            : right && <Button
                            color="inherit"
                            tooltip={right.tooltip}
                            onClick={right.onClick}
                        >
                            {right.icon}
                        </Button>
                        }
                    </div>
                </Toolbar>
            </AppBar>
            <Content
                theme={theme}
                flow={flow}
                align={align}
                margin={margin}
                padding={padding}
            >
                {children}
            </Content>
            {<StyledDrawer>
                {menu && <Image
                    source={menu.logo}
                    margin={{
                        // top: 24,
                        // bottom: 16
                        top: 1,
                        bottom: 1
                    }}
                    width={130}
                    height={130 * 139 / 300}
                    style={{
                        alignSelf: 'center',
                    }}
                />}
                {menu && menu.list
                    .filter(x => x)
                    .map(({header, items}, i) => {
                        items = items
                            .filter(x => x)
                            .map(({key, text, icon, onClick}) => {
                                return <ListItem
                                    key={key}
                                    button
                                    onClick={() => {
                                        if (menu.active !== key) {
                                            onClick();
                                        } else {
                                            this.setState({
                                                drawer: false
                                            })
                                        }
                                    }}
                                >
                                    <ListItemIcon>
                                        {icon}
                                    </ListItemIcon>
                                    <ListItemText inset primary={text} />
                                </ListItem>
                            });

                        if (header) {
                            return <StyledList
                                key={i}
                                subheader={<ListSubheader>{header}</ListSubheader>}
                            >
                                {items}
                            </StyledList>
                        }

                        return <List
                            key={i}
                        >
                            {items}
                        </List>
                    })
                }
            </StyledDrawer>}
            {notification && <Snackbar
                open={notification.message !== null}
                message={notification.message}
                onClose={notification.onClose}
                autoHideDuration={3000}
                action={[
                    <Button
                        key="close"
                        aria-label="Close"
                        color="inherit"
                        onClick={notification.onClose}
                    >
                        <icons.close />
                    </Button>,
                ]}
            />}
        </React.Fragment>
    }
}

class Content extends React.Component {
    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return (
            this.props !== nextProps
            || nextState !== this.state
        )
    }

    render() {
        let {theme, flow, align, margin, padding, children} = this.props;

        let flexParentStyle = prepareFlexParentStyle({
            flow: flow,
            align: align
        });

        const marginStyle = typeof margin !== 'undefined'
            ? prepareMarginStyle(margin, theme)
            : {};

        const paddingStyle = typeof padding !== 'undefined'
            ? preparePaddingStyle(padding, theme)
            : {};

        return <div
            style={{
                backgroundColor: '#fff',
                paddingBottom: theme.spacing.unit * 4,
                ...flexParentStyle,
                ...marginStyle,
                ...paddingStyle,
            }}
        >
            {children}
        </div>
    }
}

export default withTheme()(DrawerLayout);
