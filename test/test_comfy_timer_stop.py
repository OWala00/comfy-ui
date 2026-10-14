import sys
import time
import types
import unittest
from pathlib import Path
from unittest import mock

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT))


class TimerStopNodeTest(unittest.TestCase):
    def setUp(self):
        self.interrupts = []
        model_management = types.ModuleType("comfy.model_management")
        model_management.interrupt_current_processing = lambda value=True: self.interrupts.append(value)
        comfy = types.ModuleType("comfy")
        comfy.model_management = model_management
        patcher = mock.patch.dict(sys.modules, {"comfy": comfy, "comfy.model_management": model_management})
        patcher.start()
        self.addCleanup(patcher.stop)

        from comfyui_timer_stop.timer_stop import TimerStop

        self.node = TimerStop()

    def test_arm_interrupts_after_delay(self):
        self.assertEqual(self.node.arm(0.05), (True,))
        time.sleep(0.2)
        self.assertEqual(self.interrupts, [True])

    def test_arm_does_not_interrupt_before_delay(self):
        self.node.arm(5.0)
        self.assertEqual(self.interrupts, [])

    def test_node_is_registered(self):
        from comfyui_timer_stop import NODE_CLASS_MAPPINGS, NODE_DISPLAY_NAME_MAPPINGS

        self.assertEqual(NODE_CLASS_MAPPINGS["TimerStop"].__name__, "TimerStop")
        self.assertEqual(NODE_DISPLAY_NAME_MAPPINGS["TimerStop"], "Timer Stop")

    def test_input_schema(self):
        from comfyui_timer_stop.timer_stop import TimerStop

        seconds = TimerStop.INPUT_TYPES()["required"]["seconds"]
        self.assertEqual(seconds[0], "FLOAT")
        self.assertEqual(seconds[1]["min"], 1.0)


if __name__ == "__main__":
    unittest.main()
