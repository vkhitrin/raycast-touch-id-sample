# Raycast Extension touch-id-sample

**Warning: This is just a proof of concept for development purposes.**  
**This example repo relies on compiled [macos-touchid](https://github.com/emilbayes/macos-touchid) for `node@18.10.0`.**  
**Compiled binaries for `arm64` will be shipped in this directory, a guide to compile on your own will be included.**

Discussion: raycast/utils#14


https://github.com/raycast/utils/assets/32794653/69d5c9b8-d60d-4c0c-bd75-e890cc5b99f9


(Ignore typos in the video 😢)

A sample extension using [macos-touchid](https://github.com/emilbayes/macos-touchid) to add Touch ID to Raycast extension.

# Installation

## Using Shipped Binaries For `arm64`

1. Clone this repository:

    ```bash
    git clone https://github.com/vkhitrin/raycast-touch-id-sample
    ```

2. Install dependencies:

    ```bash
    cd raycast-touch-id-sample
    npm install
    ```

3. Install development extension:

    ```bash
    npm run dev
    <CTRL+C>
    ```

4. Copy Binaries To Raycast Development Extension:

    ```
    cp -r prebuilds $HOME/.config/raycast/extensions/touch-id-sample
    ```

5. Re-launch development:

    ```
    npm run dev
    ```

## Compiling Binaries Yourself

**Tested on `node@18.10.0` and `python@3.10`, please ensure you are using these versions when compiling.**

1. Clone this repository:

    ```bash
    git clone https://github.com/vkhitrin/raycast-touch-id-sample
    ```

2. Install dependencies:

    ```bash
    cd raycast-touch-id-sample
    npm install
    ```

3. Install development extension:

    ```bash
    npm run dev
    <CTRL+C>
    ```

4. Clone `macos-touchid`:

    ```bash
    git clone https://github.com/emilbayes/macos-touchid /tmp/macos-touchid
    ```

5. Install dependencies:

    ```bash
    cd /tmp/macos-touchid
    npm install
    ```

6. Apply git patch:

    ```diff
    git apply << EOF
    diff --git a/binding.gyp b/binding.gyp
    index d28d6b1..b4adf49 100644
    --- a/binding.gyp
    +++ b/binding.gyp
    @@ -1,4 +1,7 @@
     {
    +  'variables': {
    +    'openssl_fips': ''
    +  },
       'targets': [
         {
           'target_name': 'macos_touchid',
    diff --git a/package.json b/package.json
    index d19a51d..35c1efb 100644
    --- a/package.json
    +++ b/package.json
    @@ -12,7 +12,7 @@
       },
       "devDependencies": {
         "node-gyp": "^5.0.0",
    -    "prebuildify": "^3.0.0",
    +    "prebuildify": "^5.0.1",
         "standard": "^12.0.1",
         "tape": "^4.10.2"
       },
    @@ -22,7 +22,7 @@
         "dev": "node-gyp rebuild",
         "clean": "rm -rf build",
         "install": "node-gyp-build",
    -    "prebuild": "prebuildify --napi --strip"
    +    "prebuild": "prebuildify --napi --strip; prebuildify --napi --strip --target='electron@3.0.0'"
       },
       "repository": {
         "type": "git",
    EOF
    ```

7. Build binaries:

    ```bash
    npm run prebuild
    ```

8. Copy Binaries To Raycast Development Extension:

    ```
    cp -r prebuilds $HOME/.config/raycast/extensions/touch-id-sample
    ```

9. Re-launch development:

    ```
    npm run dev
    ```
