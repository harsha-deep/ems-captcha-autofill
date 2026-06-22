# EMS Captcha Autofill

A browser extension that automatically fills in captcha fields on EMS.

<a href="https://chromewebstore.google.com/detail/emfmibmpllcchgnopclcikhhneiiboip">
  <img width="409" height="123" alt="download" src="https://github.com/user-attachments/assets/4fd41190-a63f-4ca3-a6cd-c638e168f65b" alt="Download from the Chrome Web Store"/>
</a>



## Installation

### Chrome/Edge

1. Download the latest release from the releases page
2. Extract the ZIP file
3. Open Chrome and navigate to `chrome://extensions/`
4. Enable "Developer mode" in the top right
5. Click "Load unpacked" and select the extracted folder

## Building from Source

### Prerequisites

- Git
- Bash (Linux/Mac) or PowerShell (Windows)

### Build Steps

**Linux/Mac:**
```bash
./build.sh
```

**Windows:**
```powershell
.\build.ps1
```

The build script will create a `dist` folder containing the packaged extension.

## License

See [LICENSE](LICENSE) file for details.
