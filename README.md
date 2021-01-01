# h_api - public hitom.la mirror api
(inspired by [saebasol/Heliotrope](https://github.com/Saebasol/Heliotrope))

![banner](https://github.com/deno-nekos/hitomi/raw/main/docs/banner.png)
* this module is a part of [deno for nekos](https://github.com/deno-nekos) project

> this api uses our hitomi module\
> you can found it here: https://github.com/deno-nekos/hitomi


## api docs
BaseURL:
```
https://h_api.pmh.codes
```

### GET /
show endpoints

### GET /gallery/<id: number>
> example: `/gallery/1806299`\
> returns: [`GalleryInfo from our hitomi module`](https://doc.deno.land/https/deno.land/x/hitomi@v0.1.1/mod.ts#GalleryInfo)

show infomations about gallery

### GET /image/<hash: string>.webp
> example: `/image/9d9e063c98ebf1d88f10308c0fb279b236c54fba1cd8de5b85d07b1ddb68c696.webp`\
> returns: `webp binary`

get webp image binary from hash

## license
Copyright 2020 **deno for nekos** collaborators.\
See [LICENCE](LICENSE) file to get more infomation.
