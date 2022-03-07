export class SearchResult {
    id!: string;
    title!: string;
    description!: string;
    thumbnailUrl!: string;
    videoUrl!: string;

    constructor(objs?: any) {
        this.id = objs && objs.id || null;
        this.title = objs.title || null;
        this.description = objs.description || null;
        this.thumbnailUrl = objs.thumbnailUrl || null;
        this.videoUrl = objs.video || `https://www.youtube.com/watch?v=${this.id}`;
    }
}