local ReplicatedFirst = game:GetService("ReplicatedFirst")
local ReplicatedStorage = game:GetService("ReplicatedStorage")
local ServerStorage = game:GetService("ServerStorage")
local StarterPlayer = game:GetService("StarterPlayer")

local TestEZ = require(ReplicatedStorage.rbxts_include.node_modules.testez.src)

local testRoots = {
	ReplicatedFirst.Library,
	ReplicatedStorage.Library,
	ServerStorage.Library,
	StarterPlayer.StarterCharacterScripts,
	StarterPlayer.StarterPlayerScripts
}
local results = TestEZ.TestBootstrap:run(testRoots, TestEZ.Reporters.TextReporter)

-- Did something go wrong?
if #results.errors > 0 or results.failureCount > 0 then
	error("Tests failed")
end
