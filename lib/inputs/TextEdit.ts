import Gtk from 'gi://Gtk';
import Gdk from 'gi://Gdk';
import Pango from 'gi://Pango';

class TextEdit extends Gtk.Box {
    private entry: Gtk.Entry;
    private placeholderLabel: Gtk.Label;
    private isFocused: boolean = false;

    constructor(params?: { placeholder?: string }) {
        super({ orientation: Gtk.Orientation.VERTICAL });

        this.entry = new Gtk.Entry();
        this.placeholderLabel = new Gtk.Label({ label: params?.placeholder });
        this.placeholderLabel.get_style_context().add_class('placeholder-label');
        this.pack_start(this.placeholderLabel, false, false, 0);
        this.pack_start(this.entry, false, false, 0);

        // Connect focus-in and focus-out events
        this.entry.connect('focus-in-event', this.onFocusIn);
        this.entry.connect('focus-out-event', this.onFocusOut);
    }

    private onFocusIn = () => {
        this.isFocused = true;
    };

    private onFocusOut = () => {
        if (this.entry.get_text().length === 0) {
            this.isFocused = false;
        }
    };
}

export default TextEdit;