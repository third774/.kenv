// Name: toggle dark mode
// Author: Kevin Kipp
// Email: kevin.kipp@gmail.com
// Twitter: https://twitter.com/kevin_kipp
// Github: https://github.com/third774

import '@johnlindquist/kit';

// toggle dark mode on macOS using AppleScript
const script = `
    tell application "System Events"
      tell appearance preferences
        set dark mode to not dark mode
      end tell
    end tell
  `;

exec(`osascript -e '${script}'`);
