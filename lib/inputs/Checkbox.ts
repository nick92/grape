import Gtk from 'gi://Gtk';
import GLib from 'gi://GLib';

class Checkbox extends Gtk.CheckButton {
    private rippleRadius: number = 0;
    private maxRippleRadius: number = 0;
    private animationTimeoutId: number | null = null;

    constructor(params?: { label?: string; disabled?: boolean }) {
        super();

        if (params?.label) {
            this.set_label(params.label);
        }

        this.set_sensitive(!(params?.disabled ?? false));

        // Connect to the 'draw' signal to handle custom drawing
        this.connect('draw', this.onDraw);

        // Connect to the 'clicked' signal to initiate the ripple effect
        this.connect('clicked', this.onClicked);

        // Calculate the maximum ripple radius based on the button size
        const [width, height] = this.get_size_request();
        this.maxRippleRadius = Math.sqrt(width * width + height * height) / 2;
    }

    private onDraw = (widget: Gtk.Widget, cr: any) => {
        if (this.rippleRadius > 0) {
            const x = this.get_allocation().x;
            const y = this.get_allocation().y;
            cr.arc(x, y, this.rippleRadius, 0, 2 * Math.PI);

            // Set the ripple color and transparency
            cr.setSourceRGBA(0.7, 0.7, 0.7, 0.3); // Example: Light grey with some transparency
            cr.fill();
        }

        return false;
    };

    private onClicked = () => {
        if (this.animationTimeoutId !== null) {
            GLib.source_remove(this.animationTimeoutId);
            this.animationTimeoutId = null;
        }

        this.rippleRadius = 0;
        this.animateRippleEffect();
    };

    private animateRippleEffect = () => {
        this.rippleRadius += 1; // Increment the radius for the ripple effect
        this.queue_draw(); // Trigger a redraw to show the updated ripple

        // Continue the animation if the radius is less than the maximum
        if (this.rippleRadius < this.maxRippleRadius) {
            this.animationTimeoutId = GLib.timeout_add(GLib.PRIORITY_DEFAULT, 16, () => {
                this.animateRippleEffect();
                return GLib.SOURCE_REMOVE; // Return false to stop the timeout function
            });
        }
    };
}

export default Checkbox;