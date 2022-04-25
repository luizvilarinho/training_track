import React from 'react';

type Props = {
    children: Array<JSX.Element>
}

function Container(props: Props) {
    return (
        <header>
            <nav>
                <ul>
                    {props.children}
                </ul>
            </nav>
        </header>
    );
}

export default Container;