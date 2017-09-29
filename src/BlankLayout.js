import React, {Component} from 'react';
import {BlankLayout as BaseBlankLayout, Button, Container, Image, Progress, Platform, Text} from '@yosmy/ui';

class BlankLayout extends Component {
    state = {
        blank: false
    };

    render() {
        const {progress, title, menu, align, style, children, ...props} = this.props;

        return <BaseBlankLayout
            title={title}
            style={{
                margin: '0 auto',
                maxWidth: '1200px',
                ...style
            }}
            flow="column"
            align={{
                justifyContent: 'flex-start',
                alignItems: 'center'
            }}
            {...props}
        >
            <Container
                flow="row"
                align={{
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                }}
                padding={{
                    top: 8,
                    bottom: 8
                }}
                // background="#e5e5e5"
                background="#F4F6FF"
            >
                <Container
                    flow="row"
                    align={{
                        justifyContent: 'flex-start',
                        alignItems: 'center',
                    }}
                    style={{
                        flex: 2,
                    }}
                >
                    {menu && <Container
                        flow='row'
                        align={{
                            justifyContent: 'flex-start',
                            alignItems: 'flex-start'
                        }}
                        margin={{
                            left: 8,
                            bottom: 8
                        }}
                    >
                        <Image
                            source={menu.logo}
                            height={Platform.dimensions.isSmDown(this.props.width) ? 30 : 60}
                            onClick={props.onNavigateToWelcome}
                        />
                    </Container>}
                </Container>
                {menu && <Container
                    flow="row"
                    align={{
                        justifyContent: 'flex-end',
                        alignItems: 'center',
                    }}
                    style={{
                        flex: 2,
                    }}
                >
                    {menu.items
                        .filter(x => x)
                        .map(({key, icon, text, onClick}) => {
                            return <Button
                                key={key}
                                variant="text"
                                onClick={onClick}
                                tooltip={text}
                            >
                                {<icon.type
                                    {...icon.props}
                                    style={{
                                        color: '#1A7BBD'
                                    }}
                                />}
                            </Button>
                        })}
                </Container>}
            </Container>
            {(progress || title) && <Container
                flow="row"
                align={{
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
                margin={{
                    top: 16,
                    bottom: 16
                }}
                height={30}
            >
                {progress
                    ? <Progress />
                    : <Text
                        variant="h4"
                        color="primary"
                    >
                        {title}
                    </Text>
                }
            </Container>}
            <Content align={align}>
                {children}
            </Content>
        </BaseBlankLayout>
    }
}

class Content extends React.Component
{
    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return (
            this.props !== nextProps
            || nextState !== this.state
        )
    }

    render() {
        const {align, children} = this.props;

        return <Container
            align={align}
            padding={{
                bottom: 8
            }}
        >
            {children}
        </Container>;
    }
}

export default Platform.dimensions.withWidth()(BlankLayout);
