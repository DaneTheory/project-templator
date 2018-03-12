# Templates

You can easily customize your templating to suit your needs, preferences or requirements.

## Template engines

You can pass a `templateEngines` function that returns a map of template rendering engines to be used to render your templates. The default configuration is setup only for `ect` templates as follows:

```js
  templateEngines() {
    return {
      ect: ect.render
    }
  }
```

The keys of the map returned by `templateEngines` is also used by `stripTemplateExt` to recognize and strip away the template extension to form the file name to be used to write to the destination.
