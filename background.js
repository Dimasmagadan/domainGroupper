chrome.action.onClicked.addListener((tab) => {
    chrome.tabs.query({}, (tabs) => {
      const currentDomain = new URL(tab.url).hostname;
      let tabsToGroup = [];
  
      tabs.forEach((tab) => {
        if (new URL(tab.url).hostname === currentDomain) {
          tabsToGroup.push(tab.id);
        }
      });
  
      if (tabsToGroup.length > 0) {
        chrome.tabGroups.query({title: currentDomain}, (groups) => {
          if (groups.length > 0) {
            // A group already exists, add tabs to this group.
            chrome.tabs.group({groupId: groups[0].id, tabIds: tabsToGroup});
          } else {
            // Create a new group and add tabs.
            chrome.tabs.group({createProperties: {}, tabIds: tabsToGroup}, (groupId) => {
              chrome.tabGroups.update(groupId, {title: currentDomain, color: 'grey'});
            });
          }
        });
      }
    });
});
