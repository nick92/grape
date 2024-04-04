import Gtk from 'gi://Gtk?version=3.0';

enum ButtonSize {
    Small = 'sm',
    Medium = 'md',
    Large = 'lg'
}

class Button extends Gtk.Button {
    private _outlined: boolean;
    private _size: ButtonSize;
    private _image: Gtk.Image | null = null;
    private _label: Gtk.Label | null = null;

    constructor(params?: { outlined?: boolean; disabled?: boolean; label?: string, size?: ButtonSize, image?: string, imagePosition?: 'start' | 'end' }) {
        super();
        this._outlined = params?.outlined ?? false;
        // Set the initial disabled state based on params
        this.set_sensitive(!(params?.disabled ?? false));
        this._size = params?.size ?? ButtonSize.Medium; // Default size is Medium

        if (params?.image) {
            const box = new Gtk.Box({ orientation: Gtk.Orientation.HORIZONTAL, spacing: 6 });
            this._image = new Gtk.Image({ file: params.image });
            this._label = new Gtk.Label({ label: params.label });
            if (params.imagePosition === 'start') {
                box.pack_start(this._image, false, false, 0);
                if (params?.label) {
                    box.pack_start(this._label, false, false, 0);
                }
            } else if (params.imagePosition === 'end') {
                if (params?.label) {
                    box.pack_start(this._label, false, false, 0);
                }
                box.pack_start(this._image, false, false, 0);
            }
            this.add(box);
        }

        // Create a container for the label and the image

        // Set label if provided
        if (params?.label) {
            this.set_label(params.label);
        }

        // Connect the draw signal to handle custom drawing if outlined
        if (this._outlined) {
            this.connect('draw', this.onDrawOutline);
        }

        this.applySize();
    }

    private onDrawOutline(widget: Gtk.Widget, cr: any) {
        // Custom draw function to draw the outline
        const allocation = this.get_allocation();
        cr.setSourceRGB(0, 0, 0); // Set color for the outline
        cr.rectangle(1, 1, allocation.width - 2, allocation.height - 2);
        cr.stroke();
    }

    set outlined(value: boolean) {
        this._outlined = value;
        if (this._outlined) {
            // Connect the draw signal if not already connected
            this.connect('draw', this.onDrawOutline);
        } else {
            // Disconnect the draw signal if outlined is set to False
            // GJS doesn't have a direct method to disconnect by handler ID,
            // so this might require a workaround or custom logic to manage signal handlers
        }
        this.queue_draw(); // Trigger a redraw
    }


    private applySize() {
        // Adjust the button's style properties based on the size
        switch (this._size) {
            case ButtonSize.Small:
                this.set_property('margin', 4);
                this.set_property('xpadding', 6);
                this.set_property('ypadding', 2);
                break;
            case ButtonSize.Medium:
                this.set_property('margin', 6);
                this.set_property('xpadding', 8);
                this.set_property('ypadding', 4);
                break;
            case ButtonSize.Large:
                this.set_property('margin', 8);
                this.set_property('xpadding', 10);
                this.set_property('ypadding', 6);
                break;
        }
    }

    set size(value: ButtonSize) {
        this._size = value;
        this.applySize(); // Re-apply size adjustments when the size is changed
    }

    get size(): ButtonSize {
        return this._size;
    }


    get outlined(): boolean {
        return this._outlined;
    }

    set disabled(value: boolean) {
        this.set_sensitive(!value);
    }

    get disabled(): boolean {
        return !this.get_sensitive();
    }
}

export default Button;