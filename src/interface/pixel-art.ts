import z from "zod";

const Pixel = z.object({
	index: z.number().nonnegative().max(24),
	color: z.string().length(9).startsWith("#").nullable(),
});

const DrawingPixelArt = z.object({
	title: z.string().max(7),
	pixels: Pixel.array().length(25),
});

const ResponsePixelArt = z.object({
	uuid: z.uuid(),
	...DrawingPixelArt.shape,
	publishedAt: z.date(),
});
const ResponsePixelArtFromDB = z.object({
	...ResponsePixelArt.shape,
	publishedAt: z.iso.datetime({ offset: true }),
});

const SavedPixelArt = z.object({
	...ResponsePixelArt.shape,
	savedAt: z.date(),
});
const SavedPixelArtFromLocalStorage = z.object({
	...SavedPixelArt.shape,
	publishedAt: z.iso.datetime({ offset: true }),
	savedAt: z.iso.datetime({ offset: true }),
});

type PixelType = z.infer<typeof Pixel>;
type DrawingPixelArtType = z.infer<typeof DrawingPixelArt>;
type ResponsePixelArtType = z.infer<typeof ResponsePixelArt>;
type ResponsePixelArtFromDBType = z.infer<typeof ResponsePixelArtFromDB>;
type SavedPixelArtType = z.infer<typeof SavedPixelArt>;
type SavedPixelArtFromLocalStorageType = z.infer<
	typeof SavedPixelArtFromLocalStorage
>;

enum PixelArtDB {
	Table = "pixel_arts",
}

export {
	Pixel,
	DrawingPixelArt,
	ResponsePixelArt,
	ResponsePixelArtFromDB,
	SavedPixelArt,
	SavedPixelArtFromLocalStorage,
	PixelArtDB,
};

export type {
	PixelType,
	DrawingPixelArtType,
	ResponsePixelArtType,
	ResponsePixelArtFromDBType,
	SavedPixelArtType,
	SavedPixelArtFromLocalStorageType,
};
