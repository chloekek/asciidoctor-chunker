# asciidoctor-chunker

Splits asciidoc book's single HTML file generated by Asciidoctor into chunks by chapters, sections, subsections, or any depth as you want!.  Each chapter can have different level of extraction depth.  See [What it does](#what-it-does) for details.

## News

- 2020/2/XX (work in progress)  Added support to split into chunking by sections and subsections. This is the complete rewrite in JavaScript and runs under Node environment.
- 2021/2/10  Started to work on the more enhanced version in `javascript` branch.  Please wait a couple of weeks.  The new version can control any depth of sections to split.  And even more, each chapter can have different depth of extraction level.   The new version is written in JavaScript so it will be a lot easier to install!
- 2018/7/11  Locally linked files with `link` and `script` tags with relative paths are copied to the destination directory keeping the structure of the relative path.  So the custom CSS and script files should be properly copied by `asciidoctor-chunker`.

## What it dose

Asciidoctor-Chunker generates chunked HTML from a single HTML generated by Asciidoctor.

1. Splits part preambles and chapters (or any depth down to the sections) into separate files. Each chapter can be configured to have different depth for extractions.
1. Extracts css inside the style element into a separate file so the browser can cache and share in all the pages.
1. Places footnotes in the file they belong to.  This also means that the multiply referred footnotes are placed in the every referrer's files and sets the link back to the referrer's id whitin the page.
1. Re-writes the relative links in order to point the appropriate chunked files.
1. Copies the local images and linked files (with `link` and `script` tags) whose path is relative, to the directory relative to the chunked html output.  Files are only copied if they are new or modified compared to the copied targets.
1. Adds a titlepage link in the toc and page navigation at the bottom of each page.  This can be turned off in command option.

Here is [the sample output](http://www.seinan-gu.ac.jp/~shito/asciidoctor/html_chunk/index.html) created from the [Asciidoctor User Manual](https://asciidoctor.org/docs/user-manual/).  The footer on the sample page is added by setting the asciidoctor attribute and is not added by asciidoctor-chunker.


## Usage

Asciidoctor-Chunker is written in JavaScript and runs with NodeJS.roswell).

1. Install [Node.js](https://nodejs.org/), the JavaScript runtime. 
1. Download the pre-built program from [dist/asciidoctor-chunker.js](/dist).  Simply run it as:
    ```
    $ node asiidoctor-chunker.js [single-html-file] -o [output-directory]
    ```
   Usage discription is available with `--help` option.

`[single-html-file]` is the single HTML file generated by [Asciidoctor](https://asciidoctor.org) from the book doctype.  If the output directory is not specified, the default is `html_chunks` under the current directory.


## Example

The project contains the `example` directory where you can generate the chunked html for the [Asciidoctor User Manual](https://asciidoctor.org/docs/user-manual/) by invoking `make`.  Simply go into the `example` directory and invoke `make`.  This will clone the asciidoctor project from the github for the first time, then the chunked html will be generated under `test/output-chunk/html_chunk/` directory.  The `index.html` is the first page.

```
$ cd example
$ make
```

## License

MIT

## Developer's Memo

- Unit test uses `test/resources/output/single/sample.html` generated from `test/resources/sample.adoc`.
- `npm install cheerio commander`
- `npm install --save-dev ava webpack webpack-cli`
