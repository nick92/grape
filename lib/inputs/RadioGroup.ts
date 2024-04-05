import Gtk from 'gi://Gtk';
import Gdk from 'gi://Gdk';
import Pango from 'gi://Pango';


class RadioGroup extends Gtk.Box {
    private _buttonGroup: Gtk.RadioButton[];

    constructor(params?: { label?: string, buttonGroup?: Gtk.RadioButton[] }) {
        super({ orientation: Gtk.Orientation.VERTICAL, spacing: 6 });

        // Label header
        const headerLabel = new Gtk.Label({ label: params?.label });
        this.pack_start(headerLabel, false, false, 0);

        this._buttonGroup = new Gtk.RadioButton.
            params?.buttonGroup?.forEach(radioButton => {
                this._buttonGroup.push(radioButton);
            });

        this.pack_start(this._buttonGroup, false, false, 0);
    }

    // Function to add this radio group to a parent widget
    set addRadioButton(label: string) {
        const radioButton = new Gtk.RadioButton(this._buttonGroup);
        buttonGroup.add(this.box);
    }
}