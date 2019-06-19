import React from "react";
import Button from "./Button";
interface IState {
};

interface IProps {
}

export default class BookmarkButton extends React.Component<IProps, IState> {
    bookmark = () => {
        // @ts-ignore
        if (window.sidebar && window.sidebar.addPanel) {
            // @ts-ignore
            window.sidebar.addPanel(document.title, window.location.href, '');
        } else if (window.external && ('AddFavorite' in window.external)) {
            // @ts-ignore
            window.external.AddFavorite(window.location.href, window.document.title);
            // @ts-ignore
        } else if (window.opera && window.print || window.sidebar && !(window.sidebar instanceof Node)) {
            // @ts-ignore
            window.triggerBookmark.attr('rel', 'sidebar').attr('title', window.document.title).attr('href', window.location.href);
            return true;
        } else {
            const buttonsCombination = `${(navigator.userAgent.toLowerCase().indexOf('mac') != - 1 ? 'Command/Cmd' : 'CTRL')} + D`;
            alert(`Press ${buttonsCombination} to add this page to you Bookmarks!`);
        }
        return false;
    }

    render() {
        return (
            <Button onClick={this.bookmark}>
                {this.props.children}
            </Button>
        );
    }
}