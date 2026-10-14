import threading


class TimerStop:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "seconds": ("FLOAT", {"default": 30.0, "min": 1.0, "max": 3600.0, "step": 1.0}),
            }
        }

    RETURN_TYPES = ("BOOLEAN",)
    RETURN_NAMES = ("armed",)
    FUNCTION = "arm"
    CATEGORY = "utils/timing"

    def arm(self, seconds):
        from comfy import model_management

        timer = threading.Timer(seconds, model_management.interrupt_current_processing)
        timer.daemon = True
        timer.start()
        return (True,)
