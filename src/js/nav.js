import React from 'react';

class Nav extends React.Component {

  render() {
    const nav = this.props.navData;
    const topChannels = nav.topChannels;
    let subChannels = [];

    const topChannelItems = topChannels.map((topChannel, i) => {

      const topChannelItemClass = topChannel.index === this.props.indexForSelectedTopChannel ? "ftc-header__nav-item ftc-header__nav-topitem ftc-header__nav-topitem-selected" : "ftc-header__nav-item ftc-header__nav-topitem";
      const pushdownSubChannels = topChannel.subChannels;
     
      let pushdownSubChannelItems;
      if (pushdownSubChannels && pushdownSubChannels.length>0) {
        pushdownSubChannelItems = pushdownSubChannels.map((subChannel, i) => {
          return (
            <li className="ftc-header__nav-pushdownitem" key={subChannel.index}>
              <a href={subChannel.url}>
                {subChannel.name}
              </a>
            </li>
          )
        });
      }


      if (topChannel.index === this.props.indexForSelectedTopChannel) {  
        subChannels = topChannel.subChannels;//subChannels存储被选中的topChannel对应的subChannels数据

      }
      return (
        <li className={topChannelItemClass} key={topChannel.index} dataindex={topChannel.index} dataname={topChannel.name}>
          <a href={topChannel.url}>
            {topChannel.name}
          </a>
          { (pushdownSubChannels && pushdownSubChannels.length>0) &&
          <ul className="ftc-header__nav-pushdownlist">
            {pushdownSubChannelItems}
          </ul>
          }
        </li>
      );
    });
    
    const subChannelItems = subChannels.map((subChannel, i) => {
      const subChannelItemClass = subChannel.index === this.props.indexForSelectedSubChannel ? "ftc-header__nav-item ftc-header__nav-subitem ftc-header__nav-subitem-selected" : "ftc-header__nav-item ftc-header__nav-subitem";
      return (
        <li className={subChannelItemClass} key={subChannel.index}>
          <a href={subChannel.url}>
            {subChannel.name}
          </a>
        </li>
      );
    });

    const navClass = this.props.showMobileNav? "ftc-header__nav":"ftc-header__nav ftc-header__nav-mobileclose";

    const navTopClass = this.props.sticky ? "ftc-header__nav-list ftc-header__nav-toplist ftc-header--sticky" : "ftc-header__nav-list ftc-header__nav-toplist";
    return (
      <nav className={navClass} aria-label="Main navigation">
        <ul ref="topnav" className={navTopClass} onClick={this.props.clickTopChannel} data-ftc--sticky >
          {topChannelItems}
        </ul>
        <ul className="ftc-header__nav-list ftc-header__nav-sublist">
          {subChannelItems}
        </ul>
      </nav>

    )
  }
}

export default Nav;